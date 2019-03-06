#!/bin/bash
rm -rf ./dist

# no dependencies
ng build alert
ng build common
ng build charts
ng build forms
ng build translate

# translate dependent
ng build app-state

# app-state dependent
ng build dashboard

# common dependent
ng build auth
ng build pagination

# alert, app-state, common, drag-n-drop
ng build filemanager


# copy assets
cp -r ./src/dashboard/assets ./dist/dashboard/assets
cp -r ./src/filemanager/assets ./dist/filemanager/assets