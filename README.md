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
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

## For deploying

```json
npm run build
```

