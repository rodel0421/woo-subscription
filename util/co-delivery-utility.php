<?php 

function get_word_day_interval($i) {
    if ($i === null) {
        return "";
    }

    $lastDigit = $i % 10;

    $suffix = match ($lastDigit) {
        1 => 'st',
        2 => 'nd',
        3 => 'rd',
        default => 'th'
    };

    return "every " . $i . $suffix . " Day of ";
}

function get_word_date_interval($i) {
    if ($i == 1) {
        return "every ";
    }

    $lastDigit = $i % 10;

    $suffix = match ($lastDigit) {
        1 => 'st',
        2 => 'nd',
        3 => 'rd',
        default => 'th'
    };

    return "every " . $i . $suffix . " ";
}


?>