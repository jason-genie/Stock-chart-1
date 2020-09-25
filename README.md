# [Stock]
## Backend development workflow

```json
virtualenv env
source env/bin/activate

or
pip3 install -U pip virtualenv
virtualenv --system-site-packages -p python ./venv
.\venv\Scripts\activate

pip install -r requirements.txt
"To run server, Step 1": Go to project folder/backend:
python manage.py runserver
```

## Frontend development workflow

```json
npm i
"To run server, Step 2": Go to project folder: 
npm start
```

## For deploying

```json
npm run build
```

## To access webpage:

http://localhost:3000/admin/dashboard

