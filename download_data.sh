mkdir books/raw
wget -i download_links.txt -P books/raw/

# Normalize extensions (strip .utf-8 suffix)
for f in ./books/raw/*.txt.utf-8;
do
  mv -- "$f" "${f%.txt.utf-8}.txt"
done
