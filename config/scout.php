<?php

use craft\elements\db\EntryQuery;
use craft\elements\Entry;
use rias\scout\IndexSettings;
use rias\scout\ScoutIndex;

return [
    'sync' => true,
    'queue' => false,
    'ttr' => 300,
    'priority' => 1024,
    'connect_timeout' => 1,
    'batch_size' => 1000,
    'application_id' => '$ALGOLIA_APPLICATION_ID',
    'admin_api_key' => '$ALGOLIA_ADMIN_API_KEY',
    'search_api_key' => '$ALGOLIA_SEARCH_API_KEY', //optional

    'indices' => [
        ScoutIndex::create(getenv('CRAFT_ENVIRONMENT') . '-model-kits')
            ->elementType(Entry::class)
            ->criteria(function(EntryQuery $query) {
                return $query->section('modelKits');
            })
            ->transformer(function(Entry $entry) {
                $productLineLvl0 = $entry->productLine->level(1)->one()->title;
                $productLineLvl1 = $entry->productLine->level(2)->one()->title;

                return [
                    'title' => $entry->title,
                    'url' => '/' . $entry->uri,
                    'product-line' => [
                        'lvl0' => $productLineLvl0,
                        'lvl1' => $productLineLvl0 . ' > ' . $productLineLvl1
                    ],
                    'image' => $entry->coverImage->one()->getUrl()
                ];
            })
            ->indexSettings(IndexSettings::create()
                ->searchableAttributes([
                    'title',
                    'product-line'
                ])
                ->attributesForFaceting([
                    'product-line'
                ])
            )
    ],

    /**
     * Elements can create multiple records by using `splitElementsOn()`,
     * which split the element on specified array values. If the array has just one item,
     * no splitting occurs. The legacy and default behavior is to simply use the
     * original, unchanged record, which means the value is still wrapped in an array.
     * Make this false to use the single item itself.
     */
    'useOriginalRecordIfSplitValueIsArrayOfOne' => true,
];
