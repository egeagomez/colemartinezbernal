# Genera WAV en castellano con una voz de Windows, sin cambiar su configuración.
param([string]$Destination = (Join-Path $PSScriptRoot '..\assets\audio'))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media.SpeechSynthesis, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.SpeechSynthesis.SpeechSynthesisStream, Windows.Media.SpeechSynthesis, ContentType = WindowsRuntime] | Out-Null
$synth = New-Object Windows.Media.SpeechSynthesis.SpeechSynthesizer
$voice = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.Language -eq 'es-ES' -and $_.DisplayName -match 'Helena' } | Select-Object -First 1
if (-not $voice) { $voice = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.Language -eq 'es-ES' } | Select-Object -First 1 }
if (-not $voice) { throw 'Se necesita una voz es-ES instalada para regenerar los audios.' }
$synth.Voice = $voice
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
$awaitSpeech = $asTask.MakeGenericMethod([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
$dataPath = Join-Path $PSScriptRoot 'audio-manifest.json'
$manifest = Get-Content -LiteralPath $dataPath -Raw -Encoding UTF8 | ConvertFrom-Json
New-Item -ItemType Directory -Path $Destination -Force | Out-Null
foreach ($item in $manifest) {
    $safeText = [System.Security.SecurityElement]::Escape($item.text)
    $rate = if ($item.kind -eq 'chunk') { '-30%' } else { '-15%' }
    $ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-ES"><prosody rate="' + $rate + '">' + $safeText + '</prosody></speak>'
    $operation = $synth.SynthesizeSsmlToStreamAsync($ssml)
    $task = $awaitSpeech.Invoke($null, @($operation))
    $stream = $task.Result
    $reader = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream)
    $file = [System.IO.File]::Create((Join-Path $Destination $item.file))
    try { $reader.CopyTo($file) } finally { $file.Dispose(); $reader.Dispose(); $stream.Dispose() }
}
$synth.Dispose()
Write-Output ('Audios creados: ' + $manifest.Count + '. Voz: ' + $voice.DisplayName)
