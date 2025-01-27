-- main.lua

-- imports
local LoginMenu = require("loginMenu")

-- current menu pointer
local CurrentMenu

function love.load()
    love.keyboard.setTextInput(true)
    love.keyboard.setKeyRepeat(true)
    CurrentMenu = LoginMenu
end

function love.update(dt)
    CurrentMenu:update()
end

function love.draw()
    CurrentMenu:draw()
end

-- keyboard I/O
function love.textinput(t)
    print("TEXT INPUT")
    CurrentMenu:textinput(t)
    -- text = text .. t
end

function love.keypressed(key)
    print("KEY PRESSED"..key)
    CurrentMenu:keyPressed(key)
    -- if key == "backspace" then
    --     -- get the byte offset to the last UTF-8 character in the string.
    --     local byteoffset = utf8.offset(text, -1)

    --     if byteoffset then
    --         -- remove the last UTF-8 character.
    --         -- string.sub operates on bytes rather than UTF-8 characters, so we couldn't do string.sub(text, 1, -2).
    --         text = string.sub(text, 1, byteoffset - 1)
    --     end
    -- end
end
