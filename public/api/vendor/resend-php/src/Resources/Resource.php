<?php

namespace Resend\Resources;

use Resend\Contracts\Transporter;

abstract class Resource
{
    /**
     * Create a new resource instance.
     */
    public function __construct(
        protected Transporter $transporter
    ) {
        //
    }
}
