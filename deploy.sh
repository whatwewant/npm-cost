#!/bin/bash

echo "deploy to gh-pages."

cp -rf dist/* gh-pages
cp CNAME gh-pages
cd gh-pages
git add --all .
git commit -a -m ':sparkles:(TravisCI) automatically update from travis_ci ${TRAVIS_TAG}'
git push --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages:gh-pages
