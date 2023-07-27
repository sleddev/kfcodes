import base64
import math
import secrets
import hashlib
import re
import requests

from typing import Literal
from datetime import datetime

from fastapi import FastAPI, Request, Response
from pydantic import BaseModel
from dotenv import dotenv_values, set_key
from starlette.middleware.cors import CORSMiddleware

env = dotenv_values('.env')
app = FastAPI()

def refreshenv():
  global env
  env = dotenv_values('.env')

origins = [
  "*"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get('/')
async def awoo():
  return {"woof": "awoo"}


def get_codes():
  try:
    with open('codes.txt') as f:
      return [int(code) for code in f.read().splitlines()]
  except:
    print('Failed to read codes')

def set_codes(codes):
  codes = get_codes() + codes
  with open('codes.txt', 'w') as f:
    f.write("\n".join([str(code) for code in set(sorted(codes))]))
def remove_codes(codes):
  codes = [code for code in get_codes() if not code in codes]
  with open('codes.txt', 'w') as f:
    f.write("\n".join([str(code) for code in set(sorted(codes))]))

@app.get('/codes')
async def codes():
  return get_codes()

@app.get('/remaining')
async def remaining():
  codes = get_codes()
  return [code for code in range(1, 100) if not code in codes]

class SetCodesBody(BaseModel):
  codes: str = '-1'
  remove: str = '-1'
  password: str = None
@app.post('/setcodes')
async def setcodes(response: Response, body: SetCodesBody = None):
  if (body is None or body.codes is None or body.password is None):
    response.status_code = 400
    return {'error': 'Invalid request body'}
  if (not secrets.compare_digest(body.password, env['PASS'])):
    response.status_code = 401
    return {'error': 'Incorrect password'}
  codelist = []
  removelist = []
  try:
    codelist = [int(code) for code in body.codes.split(',') if not code is "-1"]
    removelist = [int(code) for code in body.remove.split(',') if not code is "-1"]
  except:
    print(removelist)
    response.status_code = 400
    return {'error': 'Invalid codes'}
  set_codes(codelist)
  remove_codes(removelist)
  return {'message': 'codes added/removed'}

@app.get('/password')
async def check_password(response: Response, password: str = ''):
  if (not secrets.compare_digest(password, env['PASS'])):
    response.status_code = 401
    return {'error': 'Incorrect password'}
  return {'message': 'Correct password:)'}


##### Admin #####

@app.get('/admin/setpassword')
async def setpassword(response: Response, admin: str, new: str):
  if (not secrets.compare_digest(admin, env['ADMIN_PASS'])):
    response.status_code = 401
    return {'error': 'Incorrect password'}
  set_key('.env', 'PASS', new)
  refreshenv()
  return {'message': 'Password changed'}


##### Backups #####

@app.get('/backup/list')
async def list_backups():
  pass

@app.get('/backup/new')
async def new_backup():
  pass

@app.get('/backup/restore')
async def restore_backup():
  pass