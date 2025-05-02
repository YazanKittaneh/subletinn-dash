create type "public"."SubscriptionStatus" as enum ('TRIALING', 'ACTIVE', 'PAUSED', 'CANCELED', 'PAST_DUE', 'UNPAID', 'INCOMPLETE', 'EXPIRED');

create type "public"."TeamMemberRole" as enum ('MEMBER', 'OWNER');

create type "public"."UserOneTimePasswordType" as enum ('SIGNUP', 'LOGIN', 'PASSWORD_RESET');

create type "public"."UserRole" as enum ('USER', 'ADMIN');

create type "public"."app_role" as enum ('admin', 'user');

create type "public"."business_status" as enum ('pending', 'processing', 'completed', 'rejected');

create type "public"."entity_type" as enum ('LLC', 'S-CORP', 'C-CORP');

create type "public"."expedite_option" as enum ('YES', 'NO');

create type "public"."room_status" as enum ('available', 'occupied', 'maintenance');

create type "public"."yk_technologies" as enum ('React', 'Next.js', 'Nest.js', 'Node.js', 'REST', 'GraphQL', 'RabbitMQ');

create sequence "public"."yk_education_id_seq";

create sequence "public"."yk_experiences_id_seq";

create sequence "public"."yk_projects_id_seq";

create sequence "public"."yk_resume_id_seq";

create sequence "public"."yk_technology_categories_id_seq";

create table "public"."business_formations" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone,
    "entity_name" text not null,
    "entity_address" text not null,
    "service_product_offered" text not null,
    "entity_type" text not null,
    "expedite" text not null,
    "owners" jsonb not null,
    "signatures" jsonb,
    "user_id" uuid not null,
    "status" text default 'pending'::text
);


alter table "public"."business_formations" enable row level security;

create table "public"."contact_submissions" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "email" text not null,
    "subject" text not null,
    "message" text not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."rooms" (
    "id" uuid not null default gen_random_uuid(),
    "room_number" integer not null,
    "room_name" text not null,
    "occupant" text,
    "status" room_status not null,
    "building" text not null,
    "floor" integer not null,
    "position" jsonb not null,
    "move_in" timestamp with time zone not null,
    "last_cleaned" timestamp with time zone,
    "notes" text,
    "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP
);


create table "public"."tasks" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone,
    "title" text not null,
    "description" text,
    "is_complete" boolean not null default false,
    "user_id" uuid not null,
    "due_date" timestamp with time zone,
    "priority" text
);


alter table "public"."tasks" enable row level security;

create table "public"."user_preferences" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null,
    "has_completed_onboarding" boolean default false,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."users" (
    "id" uuid not null,
    "email" text not null,
    "full_name" text,
    "is_admin" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "invited_by" uuid
);


alter table "public"."users" enable row level security;

create table "public"."yk_education" (
    "id" integer not null default nextval('yk_education_id_seq'::regclass),
    "institution" text not null,
    "degree" text not null,
    "location" text not null,
    "graduation_date" text not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."yk_experiences" (
    "id" integer not null default nextval('yk_experiences_id_seq'::regclass),
    "company" text not null,
    "company_url" text,
    "title" text not null,
    "location" text not null,
    "period" text not null,
    "achievements" text[] not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."yk_projects" (
    "id" integer not null default nextval('yk_projects_id_seq'::regclass),
    "title" text not null,
    "url" text,
    "year" text not null,
    "description" text not null,
    "challenge" text not null,
    "category" text[] not null,
    "approach" text not null,
    "result" text not null,
    "images" text[] not null,
    "created_at" timestamp with time zone default now(),
    "technologies" yk_technologies[]
);


create table "public"."yk_resume" (
    "id" integer not null default nextval('yk_resume_id_seq'::regclass),
    "name" text not null,
    "contact" jsonb not null,
    "created_at" timestamp with time zone default now(),
    "location" text default 'Chicago, IL'::text
);


create table "public"."yk_technology_categories" (
    "id" integer not null default nextval('yk_technology_categories_id_seq'::regclass),
    "category" text not null,
    "skills" text[] not null,
    "created_at" timestamp with time zone default now()
);


alter sequence "public"."yk_education_id_seq" owned by "public"."yk_education"."id";

alter sequence "public"."yk_experiences_id_seq" owned by "public"."yk_experiences"."id";

alter sequence "public"."yk_projects_id_seq" owned by "public"."yk_projects"."id";

alter sequence "public"."yk_resume_id_seq" owned by "public"."yk_resume"."id";

alter sequence "public"."yk_technology_categories_id_seq" owned by "public"."yk_technology_categories"."id";

CREATE UNIQUE INDEX business_formations_pkey ON public.business_formations USING btree (id);

CREATE UNIQUE INDEX contact_submissions_pkey ON public.contact_submissions USING btree (id);

CREATE INDEX idx_business_formations_status ON public.business_formations USING btree (status);

CREATE INDEX idx_business_formations_user_id ON public.business_formations USING btree (user_id);

CREATE INDEX idx_rooms_building ON public.rooms USING btree (building);

CREATE INDEX idx_rooms_floor ON public.rooms USING btree (floor);

CREATE INDEX idx_tasks_due_date ON public.tasks USING btree (due_date);

CREATE INDEX idx_tasks_priority ON public.tasks USING btree (priority);

CREATE INDEX idx_tasks_user_id ON public.tasks USING btree (user_id);

CREATE UNIQUE INDEX rooms_pkey ON public.rooms USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

CREATE UNIQUE INDEX user_preferences_pkey ON public.user_preferences USING btree (id);

CREATE UNIQUE INDEX user_preferences_user_id_key ON public.user_preferences USING btree (user_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX yk_education_pkey ON public.yk_education USING btree (id);

CREATE UNIQUE INDEX yk_experiences_pkey ON public.yk_experiences USING btree (id);

CREATE UNIQUE INDEX yk_projects_pkey ON public.yk_projects USING btree (id);

CREATE UNIQUE INDEX yk_resume_pkey ON public.yk_resume USING btree (id);

CREATE UNIQUE INDEX yk_technology_categories_pkey ON public.yk_technology_categories USING btree (id);

alter table "public"."business_formations" add constraint "business_formations_pkey" PRIMARY KEY using index "business_formations_pkey";

alter table "public"."contact_submissions" add constraint "contact_submissions_pkey" PRIMARY KEY using index "contact_submissions_pkey";

alter table "public"."rooms" add constraint "rooms_pkey" PRIMARY KEY using index "rooms_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."user_preferences" add constraint "user_preferences_pkey" PRIMARY KEY using index "user_preferences_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."yk_education" add constraint "yk_education_pkey" PRIMARY KEY using index "yk_education_pkey";

alter table "public"."yk_experiences" add constraint "yk_experiences_pkey" PRIMARY KEY using index "yk_experiences_pkey";

alter table "public"."yk_projects" add constraint "yk_projects_pkey" PRIMARY KEY using index "yk_projects_pkey";

alter table "public"."yk_resume" add constraint "yk_resume_pkey" PRIMARY KEY using index "yk_resume_pkey";

alter table "public"."yk_technology_categories" add constraint "yk_technology_categories_pkey" PRIMARY KEY using index "yk_technology_categories_pkey";

alter table "public"."business_formations" add constraint "business_formations_entity_type_check" CHECK ((entity_type = ANY (ARRAY['LLC'::text, 'S-CORP'::text, 'C-CORP'::text]))) not valid;

alter table "public"."business_formations" validate constraint "business_formations_entity_type_check";

alter table "public"."business_formations" add constraint "business_formations_expedite_check" CHECK ((expedite = ANY (ARRAY['YES'::text, 'NO'::text]))) not valid;

alter table "public"."business_formations" validate constraint "business_formations_expedite_check";

alter table "public"."business_formations" add constraint "business_formations_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'rejected'::text]))) not valid;

alter table "public"."business_formations" validate constraint "business_formations_status_check";

alter table "public"."business_formations" add constraint "business_formations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."business_formations" validate constraint "business_formations_user_id_fkey";

alter table "public"."tasks" add constraint "tasks_priority_check" CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))) not valid;

alter table "public"."tasks" validate constraint "tasks_priority_check";

alter table "public"."tasks" add constraint "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_user_id_fkey";

alter table "public"."user_preferences" add constraint "user_preferences_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_preferences" validate constraint "user_preferences_user_id_fkey";

alter table "public"."user_preferences" add constraint "user_preferences_user_id_key" UNIQUE using index "user_preferences_user_id_key";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES users(id) not valid;

alter table "public"."users" validate constraint "users_invited_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_auth_user_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.users
  SET 
    email = NEW.email,
    is_admin = COALESCE((NEW.raw_app_meta_data->>'is_admin')::boolean, false)
  WHERE id = NEW.id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user2()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Set the search path to the desired schemas
    SET search_path TO public, auth;

    -- Function logic here
    RETURN (SELECT EXISTS(SELECT 1 FROM auth.users WHERE role = 'admin' AND id = (SELECT auth.uid())));
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_modified_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."business_formations" to "anon";

grant insert on table "public"."business_formations" to "anon";

grant references on table "public"."business_formations" to "anon";

grant select on table "public"."business_formations" to "anon";

grant trigger on table "public"."business_formations" to "anon";

grant truncate on table "public"."business_formations" to "anon";

grant update on table "public"."business_formations" to "anon";

grant delete on table "public"."business_formations" to "authenticated";

grant insert on table "public"."business_formations" to "authenticated";

grant references on table "public"."business_formations" to "authenticated";

grant select on table "public"."business_formations" to "authenticated";

grant trigger on table "public"."business_formations" to "authenticated";

grant truncate on table "public"."business_formations" to "authenticated";

grant update on table "public"."business_formations" to "authenticated";

grant delete on table "public"."business_formations" to "prisma";

grant insert on table "public"."business_formations" to "prisma";

grant references on table "public"."business_formations" to "prisma";

grant select on table "public"."business_formations" to "prisma";

grant trigger on table "public"."business_formations" to "prisma";

grant truncate on table "public"."business_formations" to "prisma";

grant update on table "public"."business_formations" to "prisma";

grant delete on table "public"."business_formations" to "service_role";

grant insert on table "public"."business_formations" to "service_role";

grant references on table "public"."business_formations" to "service_role";

grant select on table "public"."business_formations" to "service_role";

grant trigger on table "public"."business_formations" to "service_role";

grant truncate on table "public"."business_formations" to "service_role";

grant update on table "public"."business_formations" to "service_role";

grant delete on table "public"."contact_submissions" to "anon";

grant insert on table "public"."contact_submissions" to "anon";

grant references on table "public"."contact_submissions" to "anon";

grant select on table "public"."contact_submissions" to "anon";

grant trigger on table "public"."contact_submissions" to "anon";

grant truncate on table "public"."contact_submissions" to "anon";

grant update on table "public"."contact_submissions" to "anon";

grant delete on table "public"."contact_submissions" to "authenticated";

grant insert on table "public"."contact_submissions" to "authenticated";

grant references on table "public"."contact_submissions" to "authenticated";

grant select on table "public"."contact_submissions" to "authenticated";

grant trigger on table "public"."contact_submissions" to "authenticated";

grant truncate on table "public"."contact_submissions" to "authenticated";

grant update on table "public"."contact_submissions" to "authenticated";

grant delete on table "public"."contact_submissions" to "prisma";

grant insert on table "public"."contact_submissions" to "prisma";

grant references on table "public"."contact_submissions" to "prisma";

grant select on table "public"."contact_submissions" to "prisma";

grant trigger on table "public"."contact_submissions" to "prisma";

grant truncate on table "public"."contact_submissions" to "prisma";

grant update on table "public"."contact_submissions" to "prisma";

grant delete on table "public"."contact_submissions" to "service_role";

grant insert on table "public"."contact_submissions" to "service_role";

grant references on table "public"."contact_submissions" to "service_role";

grant select on table "public"."contact_submissions" to "service_role";

grant trigger on table "public"."contact_submissions" to "service_role";

grant truncate on table "public"."contact_submissions" to "service_role";

grant update on table "public"."contact_submissions" to "service_role";

grant delete on table "public"."rooms" to "anon";

grant insert on table "public"."rooms" to "anon";

grant references on table "public"."rooms" to "anon";

grant select on table "public"."rooms" to "anon";

grant trigger on table "public"."rooms" to "anon";

grant truncate on table "public"."rooms" to "anon";

grant update on table "public"."rooms" to "anon";

grant delete on table "public"."rooms" to "authenticated";

grant insert on table "public"."rooms" to "authenticated";

grant references on table "public"."rooms" to "authenticated";

grant select on table "public"."rooms" to "authenticated";

grant trigger on table "public"."rooms" to "authenticated";

grant truncate on table "public"."rooms" to "authenticated";

grant update on table "public"."rooms" to "authenticated";

grant delete on table "public"."rooms" to "prisma";

grant insert on table "public"."rooms" to "prisma";

grant references on table "public"."rooms" to "prisma";

grant select on table "public"."rooms" to "prisma";

grant trigger on table "public"."rooms" to "prisma";

grant truncate on table "public"."rooms" to "prisma";

grant update on table "public"."rooms" to "prisma";

grant delete on table "public"."rooms" to "service_role";

grant insert on table "public"."rooms" to "service_role";

grant references on table "public"."rooms" to "service_role";

grant select on table "public"."rooms" to "service_role";

grant trigger on table "public"."rooms" to "service_role";

grant truncate on table "public"."rooms" to "service_role";

grant update on table "public"."rooms" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "prisma";

grant insert on table "public"."tasks" to "prisma";

grant references on table "public"."tasks" to "prisma";

grant select on table "public"."tasks" to "prisma";

grant trigger on table "public"."tasks" to "prisma";

grant truncate on table "public"."tasks" to "prisma";

grant update on table "public"."tasks" to "prisma";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

grant delete on table "public"."user_preferences" to "anon";

grant insert on table "public"."user_preferences" to "anon";

grant references on table "public"."user_preferences" to "anon";

grant select on table "public"."user_preferences" to "anon";

grant trigger on table "public"."user_preferences" to "anon";

grant truncate on table "public"."user_preferences" to "anon";

grant update on table "public"."user_preferences" to "anon";

grant delete on table "public"."user_preferences" to "authenticated";

grant insert on table "public"."user_preferences" to "authenticated";

grant references on table "public"."user_preferences" to "authenticated";

grant select on table "public"."user_preferences" to "authenticated";

grant trigger on table "public"."user_preferences" to "authenticated";

grant truncate on table "public"."user_preferences" to "authenticated";

grant update on table "public"."user_preferences" to "authenticated";

grant delete on table "public"."user_preferences" to "prisma";

grant insert on table "public"."user_preferences" to "prisma";

grant references on table "public"."user_preferences" to "prisma";

grant select on table "public"."user_preferences" to "prisma";

grant trigger on table "public"."user_preferences" to "prisma";

grant truncate on table "public"."user_preferences" to "prisma";

grant update on table "public"."user_preferences" to "prisma";

grant delete on table "public"."user_preferences" to "service_role";

grant insert on table "public"."user_preferences" to "service_role";

grant references on table "public"."user_preferences" to "service_role";

grant select on table "public"."user_preferences" to "service_role";

grant trigger on table "public"."user_preferences" to "service_role";

grant truncate on table "public"."user_preferences" to "service_role";

grant update on table "public"."user_preferences" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "prisma";

grant insert on table "public"."users" to "prisma";

grant references on table "public"."users" to "prisma";

grant select on table "public"."users" to "prisma";

grant trigger on table "public"."users" to "prisma";

grant truncate on table "public"."users" to "prisma";

grant update on table "public"."users" to "prisma";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."yk_education" to "anon";

grant insert on table "public"."yk_education" to "anon";

grant references on table "public"."yk_education" to "anon";

grant select on table "public"."yk_education" to "anon";

grant trigger on table "public"."yk_education" to "anon";

grant truncate on table "public"."yk_education" to "anon";

grant update on table "public"."yk_education" to "anon";

grant delete on table "public"."yk_education" to "authenticated";

grant insert on table "public"."yk_education" to "authenticated";

grant references on table "public"."yk_education" to "authenticated";

grant select on table "public"."yk_education" to "authenticated";

grant trigger on table "public"."yk_education" to "authenticated";

grant truncate on table "public"."yk_education" to "authenticated";

grant update on table "public"."yk_education" to "authenticated";

grant delete on table "public"."yk_education" to "prisma";

grant insert on table "public"."yk_education" to "prisma";

grant references on table "public"."yk_education" to "prisma";

grant select on table "public"."yk_education" to "prisma";

grant trigger on table "public"."yk_education" to "prisma";

grant truncate on table "public"."yk_education" to "prisma";

grant update on table "public"."yk_education" to "prisma";

grant delete on table "public"."yk_education" to "service_role";

grant insert on table "public"."yk_education" to "service_role";

grant references on table "public"."yk_education" to "service_role";

grant select on table "public"."yk_education" to "service_role";

grant trigger on table "public"."yk_education" to "service_role";

grant truncate on table "public"."yk_education" to "service_role";

grant update on table "public"."yk_education" to "service_role";

grant delete on table "public"."yk_experiences" to "anon";

grant insert on table "public"."yk_experiences" to "anon";

grant references on table "public"."yk_experiences" to "anon";

grant select on table "public"."yk_experiences" to "anon";

grant trigger on table "public"."yk_experiences" to "anon";

grant truncate on table "public"."yk_experiences" to "anon";

grant update on table "public"."yk_experiences" to "anon";

grant delete on table "public"."yk_experiences" to "authenticated";

grant insert on table "public"."yk_experiences" to "authenticated";

grant references on table "public"."yk_experiences" to "authenticated";

grant select on table "public"."yk_experiences" to "authenticated";

grant trigger on table "public"."yk_experiences" to "authenticated";

grant truncate on table "public"."yk_experiences" to "authenticated";

grant update on table "public"."yk_experiences" to "authenticated";

grant delete on table "public"."yk_experiences" to "prisma";

grant insert on table "public"."yk_experiences" to "prisma";

grant references on table "public"."yk_experiences" to "prisma";

grant select on table "public"."yk_experiences" to "prisma";

grant trigger on table "public"."yk_experiences" to "prisma";

grant truncate on table "public"."yk_experiences" to "prisma";

grant update on table "public"."yk_experiences" to "prisma";

grant delete on table "public"."yk_experiences" to "service_role";

grant insert on table "public"."yk_experiences" to "service_role";

grant references on table "public"."yk_experiences" to "service_role";

grant select on table "public"."yk_experiences" to "service_role";

grant trigger on table "public"."yk_experiences" to "service_role";

grant truncate on table "public"."yk_experiences" to "service_role";

grant update on table "public"."yk_experiences" to "service_role";

grant delete on table "public"."yk_projects" to "anon";

grant insert on table "public"."yk_projects" to "anon";

grant references on table "public"."yk_projects" to "anon";

grant select on table "public"."yk_projects" to "anon";

grant trigger on table "public"."yk_projects" to "anon";

grant truncate on table "public"."yk_projects" to "anon";

grant update on table "public"."yk_projects" to "anon";

grant delete on table "public"."yk_projects" to "authenticated";

grant insert on table "public"."yk_projects" to "authenticated";

grant references on table "public"."yk_projects" to "authenticated";

grant select on table "public"."yk_projects" to "authenticated";

grant trigger on table "public"."yk_projects" to "authenticated";

grant truncate on table "public"."yk_projects" to "authenticated";

grant update on table "public"."yk_projects" to "authenticated";

grant delete on table "public"."yk_projects" to "prisma";

grant insert on table "public"."yk_projects" to "prisma";

grant references on table "public"."yk_projects" to "prisma";

grant select on table "public"."yk_projects" to "prisma";

grant trigger on table "public"."yk_projects" to "prisma";

grant truncate on table "public"."yk_projects" to "prisma";

grant update on table "public"."yk_projects" to "prisma";

grant delete on table "public"."yk_projects" to "service_role";

grant insert on table "public"."yk_projects" to "service_role";

grant references on table "public"."yk_projects" to "service_role";

grant select on table "public"."yk_projects" to "service_role";

grant trigger on table "public"."yk_projects" to "service_role";

grant truncate on table "public"."yk_projects" to "service_role";

grant update on table "public"."yk_projects" to "service_role";

grant delete on table "public"."yk_resume" to "anon";

grant insert on table "public"."yk_resume" to "anon";

grant references on table "public"."yk_resume" to "anon";

grant select on table "public"."yk_resume" to "anon";

grant trigger on table "public"."yk_resume" to "anon";

grant truncate on table "public"."yk_resume" to "anon";

grant update on table "public"."yk_resume" to "anon";

grant delete on table "public"."yk_resume" to "authenticated";

grant insert on table "public"."yk_resume" to "authenticated";

grant references on table "public"."yk_resume" to "authenticated";

grant select on table "public"."yk_resume" to "authenticated";

grant trigger on table "public"."yk_resume" to "authenticated";

grant truncate on table "public"."yk_resume" to "authenticated";

grant update on table "public"."yk_resume" to "authenticated";

grant delete on table "public"."yk_resume" to "prisma";

grant insert on table "public"."yk_resume" to "prisma";

grant references on table "public"."yk_resume" to "prisma";

grant select on table "public"."yk_resume" to "prisma";

grant trigger on table "public"."yk_resume" to "prisma";

grant truncate on table "public"."yk_resume" to "prisma";

grant update on table "public"."yk_resume" to "prisma";

grant delete on table "public"."yk_resume" to "service_role";

grant insert on table "public"."yk_resume" to "service_role";

grant references on table "public"."yk_resume" to "service_role";

grant select on table "public"."yk_resume" to "service_role";

grant trigger on table "public"."yk_resume" to "service_role";

grant truncate on table "public"."yk_resume" to "service_role";

grant update on table "public"."yk_resume" to "service_role";

grant delete on table "public"."yk_technology_categories" to "anon";

grant insert on table "public"."yk_technology_categories" to "anon";

grant references on table "public"."yk_technology_categories" to "anon";

grant select on table "public"."yk_technology_categories" to "anon";

grant trigger on table "public"."yk_technology_categories" to "anon";

grant truncate on table "public"."yk_technology_categories" to "anon";

grant update on table "public"."yk_technology_categories" to "anon";

grant delete on table "public"."yk_technology_categories" to "authenticated";

grant insert on table "public"."yk_technology_categories" to "authenticated";

grant references on table "public"."yk_technology_categories" to "authenticated";

grant select on table "public"."yk_technology_categories" to "authenticated";

grant trigger on table "public"."yk_technology_categories" to "authenticated";

grant truncate on table "public"."yk_technology_categories" to "authenticated";

grant update on table "public"."yk_technology_categories" to "authenticated";

grant delete on table "public"."yk_technology_categories" to "prisma";

grant insert on table "public"."yk_technology_categories" to "prisma";

grant references on table "public"."yk_technology_categories" to "prisma";

grant select on table "public"."yk_technology_categories" to "prisma";

grant trigger on table "public"."yk_technology_categories" to "prisma";

grant truncate on table "public"."yk_technology_categories" to "prisma";

grant update on table "public"."yk_technology_categories" to "prisma";

grant delete on table "public"."yk_technology_categories" to "service_role";

grant insert on table "public"."yk_technology_categories" to "service_role";

grant references on table "public"."yk_technology_categories" to "service_role";

grant select on table "public"."yk_technology_categories" to "service_role";

grant trigger on table "public"."yk_technology_categories" to "service_role";

grant truncate on table "public"."yk_technology_categories" to "service_role";

grant update on table "public"."yk_technology_categories" to "service_role";

create policy "Users can delete own business formations"
on "public"."business_formations"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can insert own business formations"
on "public"."business_formations"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update own business formations"
on "public"."business_formations"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Users can view own business formations"
on "public"."business_formations"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Allow public inserts to contact_submissions"
on "public"."contact_submissions"
as permissive
for insert
to public
with check (true);


create policy "Users can delete own tasks"
on "public"."tasks"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can insert own tasks"
on "public"."tasks"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update own tasks"
on "public"."tasks"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Users can view own tasks"
on "public"."tasks"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Admins can manage all users"
on "public"."users"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.is_admin = true)))))
with check ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.id = auth.uid()) AND (u.is_admin = true)))));


create policy "Users can update own data"
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view own data"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Users can view own profile"
on "public"."users"
as permissive
for select
to authenticated
using ((id = auth.uid()));


CREATE TRIGGER update_business_formations_updated_at BEFORE UPDATE ON public.business_formations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


