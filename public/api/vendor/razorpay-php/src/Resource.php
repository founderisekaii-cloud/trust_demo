<?php

namespace Razorpay\Api;

class Resource
{
    protected $entity;

    public function __construct($entity)
    {
        $this->entity = $entity;
    }

    protected function create($attributes = array())
    {
        $entityUrl = $this->getEntityUrl();

        return Api::request('post', $entityUrl, $attributes);
    }

    protected function fetch($id)
    {
        $entityUrl = $this->getEntityUrl();
        $url = $entityUrl . '/' . $id;

        return Api::request('get', $url);
    }

    protected function all($options = array())
    {
        $entityUrl = $this->getEntityUrl();
        
        return Api::request('get', $entityUrl, $options);
    }

    protected function getEntityUrl()
    {
        return $this->entity;
    }
}
