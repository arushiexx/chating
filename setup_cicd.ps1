Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Open browser to generate token
Start-Process "https://github.com/settings/tokens/new?scopes=repo&description=Influencer_CICD"

# Create the form
$form = New-Object System.Windows.Forms.Form
$form.Text = "GitHub CI/CD Setup"
$form.Size = New-Object System.Drawing.Size(450,200)
$form.StartPosition = "CenterScreen"
$form.TopMost = $true

$label = New-Object System.Windows.Forms.Label
$label.Text = "Your browser just opened to generate a token.`n1. Scroll down and click 'Generate token'.`n2. Copy the token (ghp_...) and paste it below:"
$label.Location = New-Object System.Drawing.Point(10,10)
$label.Size = New-Object System.Drawing.Size(400, 40)
$form.Controls.Add($label)

$textBox = New-Object System.Windows.Forms.TextBox
$textBox.Location = New-Object System.Drawing.Point(10,60)
$textBox.Size = New-Object System.Drawing.Size(400,20)
$form.Controls.Add($textBox)

$button = New-Object System.Windows.Forms.Button
$button.Text = "Save & Push Code!"
$button.Location = New-Object System.Drawing.Point(150,100)
$button.Size = New-Object System.Drawing.Size(150,40)
$button.BackColor = [System.Drawing.Color]::LightGreen
$button.Add_Click({
    $token = $textBox.Text
    if ($token -like "ghp_*" -or $token -like "github_pat_*") {
        # Setup git remote with token
        Set-Location "C:\Users\Atul gupta\Downloads\influencer-bio"
        git remote set-url origin "https://${token}@github.com/arushiexx/chating.git"
        
        # Add all and push
        git add .
        git commit -m "Auto push with new pics and QR"
        git push -u origin main
        
        [System.Windows.Forms.MessageBox]::Show("Success! Your code is pushed to GitHub.", "Done", 0, [System.Windows.Forms.MessageBoxIcon]::Information)
        $form.Close()
    } else {
        [System.Windows.Forms.MessageBox]::Show("Please enter a valid GitHub token starting with ghp_ or github_pat_", "Error", 0, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
})
$form.Controls.Add($button)

$form.ShowDialog()
