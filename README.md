# Autodetail Monterrey · Meta Ads Dashboard

## Archivos del proyecto
```
autodetail-dashboard/
├── index.html        ← el dashboard (frontend)
├── api/
│   └── meta.js       ← función que llama a Meta (backend seguro)
├── vercel.json       ← configuración de Vercel
└── README.md         ← este archivo
```

## Paso a paso para subir a Vercel

### 1. Crear cuenta en Vercel
- Entrá a https://vercel.com
- Hacé clic en "Sign Up"
- Elegí "Continue with GitHub" o registrate con email

### 2. Subir el proyecto
- En el dashboard de Vercel hacé clic en "Add New → Project"
- Elegí "Browse" y seleccioná la carpeta `autodetail-dashboard`
- Hacé clic en "Deploy"

### 3. Configurar las variables de entorno (MUY IMPORTANTE)
Antes de que funcione, tenés que agregar las variables secretas:
- En Vercel, entrá a tu proyecto → "Settings" → "Environment Variables"
- Agregá estas 4 variables:

| Nombre | Valor |
|--------|-------|
| `META_TOKEN` | Tu access token de Meta (el que generamos) |
| `AD_ACCOUNT_ID` | `1273341930834102` |
| `CAMPAIGN_SERVICIOS_ID` | `120232805044050131` |
| `CAMPAIGN_ACCESORIOS_ID` | `120232805838250131` |

- Hacé clic en "Save"
- Luego andá a "Deployments" y hacé "Redeploy" para que tome los cambios

### 4. Listo
Tu dashboard va a estar disponible en una URL del tipo:
`https://autodetail-dashboard.vercel.app`

Esa URL la podés compartir con el cliente.

## Renovar el token cada 60 días
El access token expira en 60 días. Cuando expire:
1. Generá uno nuevo siguiendo el mismo proceso
2. Entrá a Vercel → Settings → Environment Variables
3. Editá `META_TOKEN` con el nuevo valor
4. Redesplegá el proyecto
