<?php

declare(strict_types=1);

namespace Resend\Resources;

use Resend\Contracts\Client;

abstract class BaseResource
{
    /**
     * Create a new resource instance.
     */
    public function __construct(
        protected readonly Client $client
    ) {
        //
    }
}
