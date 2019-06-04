/* LIBRERIAS */
const express = require('express');
const app = express();
const { GoogleAdsApi, enums } = require('google-ads-api')

//INSTANCIA DEL SERVICIO GOOGLEADSAPI
const client = new GoogleAdsApi({
    client_id: '676776716700-421all2ecvvmtp0a60uhcqdmgo0l9rpl.apps.googleusercontent.com',
    client_secret: 'VXBiQtD-IuWGYRpHoET1GVaY',
    developer_token: 'imf_zS8KfXQIzYr9wukZ9w'
})

//RUTAS
app.get('/', function(req,res){

    res.send(main(client));  
})

//LISTENING
app.listen(80, function(){
    //MENSAJE DE ENCENDIDO DEL SERVIDOR
    console.log('START PORT', 80);
})
//FUNCION MAIN
async function main(client){

    //LLAMADA A LA FUNCION CUSTOMER
    const customer = client.Customer({
        customer_account_id: '495-895-0439',
        refresh_token : '1/-Fy81WR5x2YgMg1rKRD9GVHO26oJVvyDkRWrQGCJsWw'
    })

    try {
        //GUARDANDO LOS RESULTADOS
        const results = await customer.report({
            entity: 'ad_group_ad',
            attributes: ['ad_group.id', 'ad_group_ad.ad.id'],
            metrics: ['metrics.clicks', 'metrics.impressions'],
            segments: ['segments.date'],
            constraints: [
                { 'ad_group.status': enums.AdGroupStatus.ENABLED },
                { 'ad_group_ad.status': enums.AdGroupAdStatus.ENABLED },
            ],
            date_constant: 'LAST_7_DAYS',
            order_by: 'metrics.clicks',
        })

        console.log(results);
        //RETORNANDO LOS RESULTADOS
        return results;
    } catch (err) {
        console.log(err);
        //RETORNANDO ERROR
        return err;
    }
}