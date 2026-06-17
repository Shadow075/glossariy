[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.IO.Compression.FileSystem

$dir = "M:\firefox Dow\9fd049b7-686a-47a0-9a0c-44baaa385eab"
$docxFile = Get-ChildItem -Path $dir -Filter "*.docx" | Select-Object -First 1

if (-not $docxFile) {
    Write-Host "No docx file found!"
    exit 1
}

Write-Host "Found: $($docxFile.FullName)"

$zip = [System.IO.Compression.ZipFile]::OpenRead($docxFile.FullName)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$doc = [xml]$xml
$ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $doc.SelectNodes("//w:p", $ns)
$lines = @()
foreach ($p in $paragraphs) {
    $texts = $p.SelectNodes(".//w:t", $ns)
    $line = ($texts | ForEach-Object { $_.InnerText }) -join ''
    if ($line.Trim() -ne '') {
        $lines += $line
    }
}

$output = $lines -join "`n"
$outPath = Join-Path $dir "docx_text.txt"
[System.IO.File]::WriteAllText($outPath, $output, [System.Text.Encoding]::UTF8)
Write-Host "Done. Lines: $($lines.Count). Output: $outPath"
