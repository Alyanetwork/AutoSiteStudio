<?php
function zipProject($projectPath, $outputPath) {
    $zip = new ZipArchive();
    if ($zip->open($outputPath, ZipArchive::CREATE) === TRUE) {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($projectPath));
        foreach ($files as $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($projectPath) + 1);
                $zip->addFile($filePath, $relativePath);
            }
        }
        $zip->close();
        return true;
    } else {
        return false;
    }
}
