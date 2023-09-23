@echo off
echo "Pack all compendia..."
set FOUNDRY_DATA="D:\FoundryVTT"  
set FOUNDRY_INSTALL="C:\Program Files\Foundry Virtual Tabletop"
set ARS_COMPENDIA="arm5e-compendia"
call fvtt configure set installPath  %foundry_install%
call fvtt configure set dataPath  %foundry_data%
cd %foundry_data%\Data\modules\%ars_compendia%\unpacked

call fvtt package pack -n "abilities" -t "Item" --in .\abilities --out ..\packs --nedb
call fvtt package pack -n "virtues" -t "Item" --in .\virtues --out ..\packs --nedb
call fvtt package pack -n "flaws" -t "Item" --in .\flaws --out ..\packs --nedb
call fvtt package pack -n "items" -t "Item" --in .\items --out ..\packs --nedb
call fvtt package pack -n "spells" -t "Item" --in .\spells --out ..\packs --nedb
call fvtt package pack -n "lab-virtues" -t "Item" --in .\lab-virtues --out ..\packs --nedb
call fvtt package pack -n "lab-flaws" -t "Item" --in .\lab-flaws --out ..\packs --nedb
