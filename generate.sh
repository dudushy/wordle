#! title preset
TITLE='[generate.sh]'

#* main
echo $TITLE 'run'
ng generate component test
ng generate component menu
ng generate component settings
ng generate component game
ng generate service services/global-variables

echo $TITLE 'finished.'
