-- fractal.lua
local Lsystem = {}

local Ruleset = require("ruleset")
local SymbolParser = require("symbol_parser")

-- Generate the next generation of the axiom
function Lsystem.get_next_generation(axiom, ruleset)
    local new_axiom = ""
    for i = 1, #axiom do
        local symbol = axiom:sub(i, i)
        if ruleset.ruleset[symbol] then
            new_axiom = new_axiom .. ruleset.ruleset[symbol]
        else
            new_axiom = new_axiom .. symbol
        end
    end
    return new_axiom
end

-- Axiom X
-- F --> FF
-- X --> F-[[X]+X]+F[+FX]-X
-- ø = 22.5

-- Draw the fractal based on the axiom
function Lsystem.draw_fractal(axiom, line_length, angle_increment, x, y, generations)
    local stack = {}

    for i = 1, generations do
        axiom = Lsystem.get_next_generation(axiom, Ruleset.new({
            -- F = "FF+F-F+F+FF"
            F = "FF",
            X = "F-[[X]+X]+F[+FX]-X"
        }))
    end

    local theta = math.pi / 2  -- Initial angle

    -- Loop through each symbol and perform actions
    for i = 1, #axiom do
        local symbol = axiom:sub(i, i)
        if symbol == "F" then
            local new_x, new_y = SymbolParser.forward(x, y, theta, line_length)
            love.graphics.line(x, y, new_x, new_y)  -- Draw the line
            x, y = new_x, new_y
        elseif symbol == "+" then
            theta = SymbolParser.rotate_pos(theta, angle_increment)
        elseif symbol == "-" then
            theta = SymbolParser.rotate_neg(theta, angle_increment)
        elseif symbol == "[" then
            SymbolParser.push_to_stack(stack, x, y, theta)
        elseif symbol == "]" then
            x, y, theta = unpack(SymbolParser.pop_from_stack(stack)) 
        end
    end
end

return Lsystem
