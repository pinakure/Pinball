const Geometry = [
    new Polygon(232, 318,[255,0,0],[ new Vertex(0, 1),new Vertex(0, -294),new Vertex(7, -294),new Vertex(7, 1), ], 'ramp_r'),
    new Polygon(232, 24,[255,0,0],[ new Vertex(0, 0),new Vertex(-2, -5),new Vertex(-5, -13),new Vertex(-11, -19),new Vertex(-15, -21),new Vertex(-21, -23),new Vertex(-21, -24),new Vertex(7, -24),new Vertex(7, 0), ], 'ramp_tr'),
    new Polygon(182, 11,[255,0,0],[ new Vertex(4, 4),new Vertex(6, 0),new Vertex(12, -6),new Vertex(16, -8),new Vertex(22, -10),new Vertex(22, -11),new Vertex(-6, -11),new Vertex(-6, 4), ], 'ramp_tl'),
    new Polygon(211, 1,[255,0,0],[ new Vertex(0, 0),new Vertex(-7, 0),new Vertex(-7, 0),new Vertex(0, 0), ], 'ramp_tt'),
];

const Bumpers = [
    new Polygon(39, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_1'),
    new Polygon(71, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_2'),
    new Polygon(103, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_3'),
    new Polygon(135, 77,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_4'),
    new Polygon(23, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_5'),
    new Polygon(55, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_6'),
    new Polygon(87, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_7'),
    new Polygon(119, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_8'),
    new Polygon(151, 117,[255,190,0],[ new Vertex(11, 13),new Vertex(-10, 13),new Vertex(-3, -13),new Vertex(-1, -16),new Vertex(2, -16),new Vertex(4, -13), ], 'bumper_9'),
];
const Flippers = {
    left    : new Polygon(64, 264, [255, 0, 0], [new Vertex(-8, 1), new Vertex(-8, -3), new Vertex(-7, -5), new Vertex(-5, -7), new Vertex(-3, -8), new Vertex(3, -8), new Vertex(30, 9), new Vertex(31, 10), new Vertex(31, 13), new Vertex(29, 15), new Vertex(25, 15), new Vertex(-5, 6), new Vertex(-7, 4),], 'left_flipper'),
    right   : new Polygon(144, 263,[255,0,0],[ 
        
        new Vertex(6, 5), 
        new Vertex(4, 7),
        new Vertex(-26, 16),
        new Vertex(-30, 16),
        new Vertex(-32, 14),
        new Vertex(-32, 11),
        new Vertex(-31, 10),
        new Vertex(-4, -7),
        new Vertex(2, -7),
        new Vertex(4, -6),
        new Vertex(6, -4),
        new Vertex(7, -2),
        new Vertex(7, 2),
        
    ], 
        
        'right_flipper'),
};