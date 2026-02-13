# 🦖 Papacito OS - Setup Guide

## Instalación Automática (Recomendada)

```bash
# One-line installer
curl -sSL https://raw.githubusercontent.com/jorgefsb/papacito-os/main/install.sh | bash
```

## Instalación Manual

```bash
# 1. Clonar
git clone https://github.com/jorgefsb/papacito-os.git ~/papacito-second-brain
cd ~/papacito-second-brain

# 2. Setup completo (automático)
cd my-app
./scripts/setup-all.sh

# 3. Iniciar
./start.sh
```

## Scripts Disponibles

| Script | Uso | Descripción |
|--------|-----|-------------|
| `./scripts/setup-all.sh` | Setup | Instala TODO automáticamente |
| `./start.sh` | Daily | Inicia la app con verificaciones |
| `./diagnose.sh` | Debug | Diagnóstico completo |
| `./fix-common.sh` | Repair | Arregla problemas comunes |
| `../scripts/push-to-github.sh` | Deploy | Sube a GitHub automáticamente |

## Subir a GitHub (Automático)

```bash
cd ~/papacito-second-brain
./scripts/push-to-github.sh
```

Esto:
- ✅ Instala GitHub CLI si no existe
- ✅ Verifica autenticación
- ✅ Crea el repo si no existe
- ✅ Sube el código
- ✅ Crea release v4.0.0

## Seguridad

- 🔒 **Nunca pide contraseñas** - usa GitHub CLI o SSH keys
- 🔒 **100% local** - tus datos nunca salen de tu máquina
- 🔒 **Sin APIs externas** - todo procesamiento es local

## Troubleshooting

```bash
# Si algo falla:
./diagnose.sh     # Ver qué está mal
./fix-common.sh   # Arreglar automáticamente
```
