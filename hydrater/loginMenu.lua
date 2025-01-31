-- loginMenu.lua

local component = require 'badr'
local button = require 'components.button'
local textBox = require 'components.textBox'
local apiHandler = require('.api_test')

local loginMenu


loginMenu = component { column = true, gap = 10}
    + button {
        text = 'New game',
        width = 200,
        onHover = function()
            print 'mouse entered'
            return function()
                print('mouse exited')
            end
        end
    }
    + button { 
        text = 'Settings',
        width = 200,
        onClick = function(self)
            print('settings')
        end
    }
    + textBox { text = '', width = 200}
    + button { text = 'Credits', width = 200 }
    + button { text = 'Quit', width = 200, onClick = function() love.event.quit() end }
    + button {
        text = 'Clicked: 0',
        width = 200,
        onClick = function(self)
            clicks = clicks + 1
            self.text = 'Clicked: ' .. clicks
        end
    }
    + button {
        text = 'Click to remove',
        onClick = function(self)
            self.parent = self.parent - self
            love.mouse.setCursor()
        end
    }

function loginMenu:setBackgroundColor(color)
    self.backgroundColor = color
end

function loginMenu:drawBackground()
    -- print(self.backgroundColor.RED, self.backgroundColor.GREEN, self.backgroundColor.BLUE, self.backgroundColor.ALPHA)
    local colorTable = {self.menuColor.RED/255, self.menuColor.BLUE/255, self.menuColor.GREEN/255, self.menuColor.ALPHA} 
    love.graphics.setBackgroundColor(self.menuColor.RED/255, self.menuColor.BLUE/255, self.menuColor.GREEN/255)
end

loginMenu:updatePosition(
    love.graphics.getWidth() * 0.5 - loginMenu.width * 0.5,
    love.graphics.getHeight() * 0.5 - loginMenu.height * 0.5
)

-- loginMenu:setBackgroundColor({RED = 255, GREEN = 0, BLUE = 0, ALPHA = 1})
-- loginMenu:setBackgroundColor({RED = 255, GREEN = 0, BLUE = 0, ALPHA = 1})

return loginMenu

-- return setupLoginMenu({width = 250})