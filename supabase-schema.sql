-- =========================================================
-- SENEGAL-INVEST — Schéma Supabase
-- Exécuter dans Supabase Dashboard > SQL Editor > New query
-- =========================================================

-- Table profiles (étend auth.users avec le rôle)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  nom text not null,
  email text not null,
  role text not null default 'user' check (role in ('admin', 'super-user', 'user')),
  actif boolean not null default true,
  created_at timestamptz default now()
);

-- Activer Row Level Security
alter table public.profiles enable row level security;

-- Politique : chaque user peut lire son propre profil
create policy "Lecture profil personnel"
  on public.profiles for select
  using (auth.uid() = id);

-- Politique : les admins peuvent tout lire/modifier
create policy "Admin accès total"
  on public.profiles for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Trigger : créer un profil minimal à chaque inscription (sécurité)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Le profil complet est créé par l'API admin
  -- Ce trigger gère les cas où un user se connecte sans profil
  insert into public.profiles (id, nom, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'nom', 'Utilisateur'), new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Table logs de connexion (optionnel — pour le monitoring admin)
create table if not exists public.connexion_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

alter table public.connexion_logs enable row level security;

create policy "Admin voit tous les logs"
  on public.connexion_logs for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- =========================================================
-- DONNÉES INITIALES — Créer le compte admin (toi)
-- IMPORTANT : à exécuter APRÈS avoir créé ton compte
--             via l'interface login du site.
--             Remplacer 'ton-user-id' par ton UUID Supabase.
-- =========================================================
-- 1. Connecte-toi sur le site pour créer ton user Supabase
-- 2. Récupère ton UUID dans Supabase > Authentication > Users
-- 3. Exécute cette mise à jour :

-- UPDATE public.profiles
-- SET role = 'admin', nom = 'Ibrahima'
-- WHERE email = 'ton-email@gmail.com';
