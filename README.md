# Gator - RSS Feed Aggregator CLI

A command-line RSS feed aggregator application built with TypeScript, featuring user management and feed subscription capabilities.

## Prerequisites

To run this CLI application, you'll need:

- **Node.js** (v18+) and **npm** - for running the application
- **PostgreSQL** - for the database backend
- A PostgreSQL connection string (database URL)

## Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Before running the application, you need to set up your configuration file:

1. Create a `.gatorconfig.json` file in your home directory (`~/.gatorconfig.json`)
2. Add the following configuration:
   ```json
   {
     "db_url": "postgres://username:password@localhost:5432/gator_db",
     "current_user_name": ""
   }
   ```

Replace `username`, `password`, and `gator_db` with your PostgreSQL credentials and database name.

## Running the Application

Start the CLI with:

```bash
npm start <command> [arguments]
```

### Available Commands

#### User Management

- **Register a new user:**

  ```bash
  npm start register <username>
  ```

  Example: `npm start register alice`

- **Login as a user:**

  ```bash
  npm start login <username>
  ```

  Example: `npm start login alice`

- **View all users:**

  ```bash
  npm start users
  ```

- **Reset the database:**
  ```bash
  npm start reset
  ```

#### Feed Management

- **Add a new RSS feed:**

  ```bash
  npm start addfeed <feed_name> <feed_url>
  ```

  Example: `npm start addfeed "TechNews" "https://example.com/rss"`

- **List all available feeds:**

  ```bash
  npm start feeds
  ```

- **Follow a feed** (requires login):

  ```bash
  npm start follow <feed_url>
  ```

- **View your followed feeds** (requires login):

  ```bash
  npm start following
  ```

- **Unfollow a feed** (requires login):
  ```bash
  npm start unfollow <feed_url>
  ```

#### Feed Browsing

- **Browse posts from your followed feeds** (requires login):
  ```bash
  npm start browse [limit]
  ```
  This posts from you followed feeds retrieving only the number the limit specifies.

#### Aggregation

- **Run the feed aggregator:**
  ```bash
  npm start agg <time_between_requests>
  ```
  This fetches new posts from all feeds every set interval and stores them in the database.

## Typical Workflow

1. Register a new account:

   ```bash
   npm start register john
   ```

2. Login:

   ```bash
   npm start login john
   ```

3. View available feeds:

   ```bash
   npm start feeds
   ```

4. Follow a feed:

   ```bash
   npm start follow https://techcrunch.com/feed/
   ```

5. View your followed feeds:

   ```bash
   npm start following
   ```

6. Run the aggregator to fetch new posts:

   ```bash
   npm start agg 10s
   ```

7. Browse posts:
   ```bash
   npm start browse
   ```

## Database Migrations

To manage database schema:

- Generate migrations:

  ```bash
  npm run generate
  ```

- Run migrations:
  ```bash
  npm run migrate
  ```
