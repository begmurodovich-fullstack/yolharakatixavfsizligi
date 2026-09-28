$filePath = "src\app\(public)\reyting\page.tsx"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
$newText = "Yo'l infratuzilmasini yaxshilash bo'yicha qarshi chora-tadbirlar talab etiladi"
$content = $content -replace "Tezkor infratuzilma ta[^<]+talab etiladi", $newText
[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done!"
