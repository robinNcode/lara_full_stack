# laravel 10 - full stack web development

## Steps:

1. Install Laravel
2. Create a new project
3. Migrate the database by running the command 

```
php artisan migrate
```

4. To create vite scaffolding, run the command

```
npm create vite
```
And select the following options:
```
Project name: your-project-name
Select a framework: react
Select a variant: react-js
```

5. Go to the project directory and run the command

```
npm install
```
To see the frontend changes, run the command
```
npm run dev
```

To change the port of the frontend, go to the file `package.json` and
in the scripts section, change the port number in the command
```
"dev": "vite --port 3000"
```


