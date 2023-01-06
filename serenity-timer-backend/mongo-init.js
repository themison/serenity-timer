print(
  'Start #################################################################',
);

db = db.getSiblingDB('serenity-timer');
db.createUser({
  user: 'root',
  pwd: '1235',
  roles: [{ role: 'readWrite', db: 'serenity-timer' }],
});
db.createCollection('users');

print('END #################################################################');
