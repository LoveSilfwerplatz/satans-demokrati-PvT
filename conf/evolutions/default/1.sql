# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table sound (
  id                            integer auto_increment not null,
  name                          varchar(255),
  tower_name                    varchar(255),
  constraint pk_sound primary key (id)
);

create table tower (
  id                            integer auto_increment not null,
  tower_name                    varchar(255),
  broadcast_range               integer,
  lat_coord_dd                  decimal(9,6),
  long_coord_dd                 decimal(9,6),
  constraint pk_tower primary key (id)
);

create table user (
  id                            integer auto_increment not null,
  name                          varchar(255),
  email                         varchar(255),
  password                      varchar(255),
  token                         varchar(255),
  is_admin                      tinyint(1) default 0,
  constraint pk_user primary key (id)
);

create table users (
  id                            integer auto_increment not null,
  name                          varchar(255),
  email                         varchar(255),
  password                      varchar(255),
  is_admin                      tinyint(1) default 0,
  constraint pk_users primary key (id)
);


# --- !Downs

drop table if exists sound;

drop table if exists tower;

drop table if exists user;

drop table if exists users;

