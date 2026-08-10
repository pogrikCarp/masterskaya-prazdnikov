# Production deployment

The application is deployed to `/opt/myapp` as `root`. The file `/opt/myapp/.env`
is created manually on the server and is ignored by Git. GitHub Actions never writes
or removes it.

## First server setup

1. Clone the repository:

   ```bash
   install -d -o root -g root -m 755 /opt
   git clone https://github.com/pogrikCarp/masterskaya-prazdnikov.git /opt/myapp
   ```

2. Create `/opt/myapp/.env` using the template below, then protect it:

   ```bash
   nano /opt/myapp/.env
   chmod 600 /opt/myapp/.env
   ```

3. Run the bootstrap script:

   ```bash
   cd /opt/myapp
   bash deploy/setup-server.sh example.com
   ```

The script installs Node.js, PostgreSQL, Nginx, firewall rules and the systemd unit.
It creates the PostgreSQL role/database from `POSTGRES_*` values in `.env`, applies
Prisma migrations, builds the app, and starts the service.

## `.env` template

Replace `CHANGE_THIS_TO_A_LONG_RANDOM_PASSWORD` with a password containing only
letters, digits, `_`, and `-`.

```dotenv
NODE_ENV=production
POSTGRES_DB=masterskaya
POSTGRES_USER=masterskaya
POSTGRES_PASSWORD=CHANGE_THIS_TO_A_LONG_RANDOM_PASSWORD
DATABASE_URL="postgresql://masterskaya:CHANGE_THIS_TO_A_LONG_RANDOM_PASSWORD@127.0.0.1:5432/masterskaya?schema=public"
```

Generate a suitable password on the server:

```bash
tr -dc 'A-Za-z0-9_-' </dev/urandom | head -c 32; echo
```

## GitHub Actions secrets

Add these repository secrets:

- `SSH_HOST` — server IP address
- `SSH_PORT` — `22`
- `SSH_USER` — `root`
- `SSH_PRIVATE_KEY` — full content of the private deployment key

## SSH deployment key

Generate a dedicated key on your local computer:

```bash
ssh-keygen -t ed25519 -C "github-actions-masterskaya" -f ~/.ssh/masterskaya_github_actions
```

Do not set a passphrase: GitHub Actions must use the key non-interactively.

Copy the public key to the server:

```bash
ssh-copy-id -i ~/.ssh/masterskaya_github_actions.pub root@YOUR_SERVER_IP
```

Or append the contents of `masterskaya_github_actions.pub` to:

```text
/root/.ssh/authorized_keys
```

Copy the complete contents of `~/.ssh/masterskaya_github_actions` (the private key)
to the GitHub repository secret named `SSH_PRIVATE_KEY`. Never commit or share this
private key.

## Routine deployment

Every push to `main` runs `.github/workflows/deploy.yml`. The server:

1. fetches and resets code to `origin/main`;
2. runs `npm ci`;
3. generates the Prisma client;
4. runs `prisma migrate deploy`;
5. runs lint and production build;
6. restarts `masterskaya-prazdnikov.service`.

Useful server checks:

```bash
systemctl status masterskaya-prazdnikov
journalctl -u masterskaya-prazdnikov -n 100 --no-pager
systemctl status postgresql nginx
```
