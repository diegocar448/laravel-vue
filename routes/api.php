<?php


//gerar o token
$this->post('auth', 'Auth\AuthApiController@authenticate');

//atualizar token
$this->post('auth-refresh', 'Auth\AuthApiController@refreshToken');

//recuperar usuario passando na header o token
$this->get('me', 'Auth\AuthApiController@getAuthenticatedUser');



$this->group([
    'prefix' => 'v1', 
    'namespace' => 'Api\v1',
    'middleware' => 'jwt.auth', 
    //para deixar obrigatorio passar o token valido sempre que tentar acessar a rota
], function(){

    //Retornar todos os produtos de uma determinada categoria
    $this->get('categories/{id}/products', 'CategoryController@products');

    $this->apiResource('categories', 'CategoryController');

    $this->apiResource('products', 'ProductController');
});




