<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producer;
class ProducerSeeder extends Seeder
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
        for ($i=0; $i<=50; $i++) {
            Producer::create([
                'producer_name' => $faker->unique()->name,
                'email'=>$faker->unique()->freeEmail,
                'website'=>$faker->domainName]);
        }

    }
}
