<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roletype;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = \Faker\Factory::create();
        // $faker->addProvider(new \Xylis\FakerCinema\Provider\Person($faker));
        // var_dump($actors);
        for ($i=0; $i<=10; $i++) {
            Roletype::create([
                'roletype' => $faker->unique()->word,]);
        }
    }
}
