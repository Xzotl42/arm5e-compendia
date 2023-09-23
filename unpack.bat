@echo off
echo "Unpack all compendia..."
set FOUNDRY_DATA="D:\FoundryVTT"  
set FOUNDRY_INSTALL="C:\Program Files\Foundry Virtual Tabletop"
set ARS_COMPENDIA="arm5e-compendia"
call fvtt configure set installPath  %foundry_install%
call fvtt configure set dataPath  %foundry_data%
cd %foundry_data%\Data\modules\%ars_compendia%\unpacked
call fvtt package workon arm5e-compendia --type "Module"
call fvtt package unpack -n "abilities" -t "Item" --out .\abilities
call fvtt package unpack -n "virtues" -t "Item" --out .\virtues
call fvtt package unpack -n "flaws" -t "Item" --out .\flaws
call fvtt package unpack -n "items" -t "Item" --out .\items
call fvtt package unpack -n "spells" -t "Item" --out .\spells
call fvtt package unpack -n "lab-virtues" -t "Item" --out .\lab-virtues
call fvtt package unpack -n "lab-flaws" -t "Item" --out .\lab-flaws
