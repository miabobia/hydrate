-- menu.lua

Menu = {}

function Menu.menuSetup()
    currentScreen = 'menu'
end

function Menu.menuUpdate(dt)
    if currentScreen == 'menu' then
        Menu.menuInputUpdate(dt)
    end
        -- else
    --     gameUpdate(dt)
    -- end
end

function Menu.menuDraw()
    if currentScreen == 'menu' then
        Menu.menuDraw(dt)
    end
        -- else
    --     gameDraw(dt)
    -- end
end

function Menu.menuInputUpdate(dt)
    if love.mouse.isDown(1) then
        local x, y = love.mouse.getX(), love.mouse.getY()
        --check to see if the mouse is within the option box. If it is, set currentScreen to 'game'
    end
end

return Menu