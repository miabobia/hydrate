-- main.lua

-- imports
local LoginMenu = require("loginMenu")
local apiHandler = require("api_test")

-- current menu pointer
local CurrentMenu

local colorIndex = 0

function love.load()
    love.keyboard.setTextInput(true)
    love.keyboard.setKeyRepeat(true)
    CurrentMenu = LoginMenu
end

function love.update(dt)
    CurrentMenu:update()
end

function love.draw()
    -- print(CurrentMenu.backgroundColor)
    CurrentMenu:drawBackground()
    CurrentMenu:draw()
end

-- keyboard I/O
function love.textinput(t)
    -- print("TEXT INPUT")
    CurrentMenu:textinput(t)
    if CurrentMenu.backgroundColor then
        apiHandler:dumpTable(CurrentMenu.backgroundColor)
    end
end

function love.keypressed(key)
    -- print("KEY PRESSED"..key)

    if key == "left" then
        colorIndex = colorIndex - 1
    elseif key == "right" then
        colorIndex = colorIndex + 1
    end
    -- print(colorIndex)
    apiHandler:getColor(colorIndex)

    CurrentMenu:keyPressed(key)
end
