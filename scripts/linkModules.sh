#!/bin/bash
# puts a simlink in the src/node_modules directory
# - so that import paths have a consistent base

echo "Running script: linkModules"

ln -sh ../_config src/node_modules/_config
ln -sh ../_helpers src/node_modules/_helpers
ln -sh ../_icons src/node_modules/_icons
ln -sh ../_stores src/node_modules/_stores
ln -sh ../components src/node_modules/components
ln -sh ../modules src/node_modules/modules

>&/dev/null
