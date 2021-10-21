# Node OAuth JWT

Simple project implementing OAuth 2.0 and JWT.

## Schema

```markdown
User {
  id: bigint, primary key, auto increment
  email: int, key
  name: varchar
  auth_provider: varchar
  password: varchar, nullable
  mantra_id: bigint, foreign key(Mantra)
}

Role {
  id: bigint, primary key, auto increment
  name: varchar, key
  description: varchar
}

UserRole {
  user_id: bigint, foreign key(User), primary key
  role_id: bigint, foreign key(Role), primary key
}

Mantra {
  id: bigint,
  message: string
}
```

### Flow

1. Anyone who visits is a `visiter`
2. A `visitor` can register via google, twitter or email to become a `user`
3. Some `user`s are `admin`
4. A `user` can create, update and delete their `mantra`
5. A `user` can view mantras of all other `user`s
6. An `admin` can delete any `user`s mantra
7. An `admin` can make another user `admin`
