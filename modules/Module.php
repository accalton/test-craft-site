<?php

namespace modules;

use Craft;

class Module extends \yii\base\Module
{
    public function init()
    {
        Craft::setAlias('@modules', __DIR__);

        if (Craft::$app->request->isConsoleRequest) {
            $this->controllerNamespace = 'modules\\console\\controllers';
        } else {
            $this->controllerNamespace = 'modules\\controllers';
        }

        parent::init();

        Craft::$app->onInit(function() {
            // $this->test();
        });
    }

    private function test()
    {
        $entry = \craft\elements\Entry::findOne();

        var_dump($entry->productLine->level(1)->one()->title);
        var_dump($entry->productLine->level(2)->one()->title);

        exit;
    }
}