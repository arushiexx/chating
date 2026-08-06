Add-Type -AssemblyName System.Windows.Forms
if ([System.Windows.Forms.Clipboard]::ContainsImage()) {
    $img = [System.Windows.Forms.Clipboard]::GetImage()
    $img.Save("C:\Users\Atul gupta\Downloads\influencer-bio\assets\qr-code.jpeg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    Write-Host "Image saved from clipboard!"
} else {
    Write-Host "No image in clipboard."
}
