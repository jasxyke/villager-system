<?php
namespace App\Helpers;

class HeaderHelper
{

    public static function getHeaderData()
    {
        // Convert village logo to Base64 if path exists and file is valid
        $logo1Path = SettingsHelper::get('logo_1_path') ? public_path('storage/' . SettingsHelper::get('logo_1_path')) : null;
        $logo2Path = SettingsHelper::get('logo_2_path') ? public_path('storage/' . SettingsHelper::get('logo_2_path')) : null;

        $logo1Base64 = HeaderHelper::convertToBase64($logo1Path);
        $logo2Base64 = HeaderHelper::convertToBase64($logo2Path);

        return [
            'villageName' => SettingsHelper::get('village_name'),
            'address' => SettingsHelper::get('village_address'),
            'phone1' => SettingsHelper::get('village_contact_number_1'),
            'phone2' => SettingsHelper::get('village_contact_number_2'),
            'email' => SettingsHelper::get('village_email'),
            'hoaRegNum' => SettingsHelper::get('village_hoa_reg_num'),
            'tinNum' => SettingsHelper::get('village_tin_no'),
            'villageLogo' => $logo1Base64,
            'cityLogo' => $logo2Base64,
        ];
    }

    private static function convertToBase64($path)
    {
        if (file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            return 'data:image/' . $type . ';base64,' . base64_encode($data);
        }
        return null;
    }
}