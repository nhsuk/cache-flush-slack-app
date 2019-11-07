#!/bin/bash

regex="#([0-9]+)"
echo "Testing commit msg: '$1' against regex: '$regex'."

if [[ "$1" =~ $regex ]]; then
  echo "PR number found. Value is: ${BASH_REMATCH[1]}"
  echo "##vso[task.setvariable variable=PR_NUMBER;isOutput=true]${BASH_REMATCH[1]}"
else
  echo "No PR number found. Setting to 0."
  echo "##vso[task.setvariable variable=PR_NUMBER;isOutput=true]0"
fi;
