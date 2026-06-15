@echo off
:: Configura o prompt para ler caracteres especiais corretamente
chcp 65001 > nul
cls

echo ===================================================
echo   INICIANDO BUILD DA SPA (TECLOJA) - MODO LOCAL
echo ===================================================

:: Passo 1: Limpar builds antigos se existirem
if exist dist (
    echo [1/4] Limpando pasta dist antiga...
    rmdir /s /q dist
)

:: Passo 2: Instalar dependências limpas
echo [2/4] Instalando dependências (npm install)...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao instalar as dependências.
    pause
    exit /b %errorlevel%
)

:: Passo 3: Rodar o build de produção do Angular
echo [3/4] Compilando o projeto para produção...
call npm run build -- --configuration=production
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha na compilação do Angular.
    pause
    exit /b %errorlevel%
)

:: Passo 4: Mapeamento Automático da Pasta de Saída
echo [4/4] Localizando arquivos finais...

:: Procura a pasta que contém o arquivo index.html dentro da dist
set "TARGET_DIR="
for /r ".\dist" %%i in (index.html) do (
    if exist "%%i" (
        set "TARGET_DIR=%%~dpi"
    )
)

if defined TARGET_DIR (
    echo.
    echo ===================================================
    echo   BUILD CONCLUÍDO COM SUCESSO!
    echo ===================================================
    echo Seus arquivos prontos estão em:
    echo %TARGET_DIR%
    echo.
    echo Pressione qualquer tecla para abrir a pasta do build...
    pause > nul
    start "" "%TARGET_DIR%"
) else (
    echo.
    echo [ERRO] O build terminou, mas nenhum arquivo 'index.html' foi encontrado dentro de .\dist
    echo Dê uma olhada manual na pasta dist para ver o que foi gerado.
    pause
)