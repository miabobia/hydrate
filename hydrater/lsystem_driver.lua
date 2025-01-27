-- driver.lua

local https = require("https")
local Lsystem = require("lsystem")

local width, height = love.graphics.getDimensions( )
local axiom = "X"
local line_length = 5
-- local angle_increment = math.pi / 2  -- 90 degrees
local angle_increment = 0.3926991
local x, y = width/2, height/2  -- Starting point
local generations = 3

function love.load()
    -- Load any necessary data, this could also be user input for line_length or generations
    code, body, headers = https.request( "https://google.com")
    print(code, body, headers)
end

function love.update(dt)
    -- This will be where we call Fractal.draw_fractal to draw each iteration of the fractal
end

function love.draw()
    -- Here we draw the fractal based on the current axiom and generation
    Lsystem.draw_fractal(axiom, line_length, angle_increment, x, y, generations)
end
