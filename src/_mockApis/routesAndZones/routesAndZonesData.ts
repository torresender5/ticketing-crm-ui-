export const routesAndZones = [
    {
        zone_code: '12345678',
        name: '',
        stops: [
            {
                stop_code: '1',
                trans_means: 'bus',
                name: 'parada-1',
                abbreviation: 'rta1',
                route: 'plaza venezuela - chacao',
                location: {
                    type: 'urbana',
                    state: 'Distrito Capital',
                    municipality: 'Libertador',
                    coordinates: {
                        latitude: '10.49562',
                        longitude: '-66.84887',
                    },
                },
                municipality_code: '1170001',
                state_code: 'ccs',
                is_public_stop: false,
            },
        ],
        location: {
            type: 'Polygon',
            coordintates: [
                ['lat', 'long'],
                ['lat', 'long'],
            ],
        },
    },
]
