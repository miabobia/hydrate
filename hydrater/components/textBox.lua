local component = require 'badr'
local utf8 = require('utf8')

-- https://github.com/s-walrus/hex2color/blob/master/hex2color.lua
local function Hex(hex, value)
    return {
        tonumber(string.sub(hex, 2, 3), 16) / 256,
        tonumber(string.sub(hex, 4, 5), 16) / 256,
        tonumber(string.sub(hex, 6, 7), 16) / 256,
        value or 1 }
end

return function(props)
    local font = props.font or love.graphics.getFont()
    local padding = {
        horizontal = (props.leftPadding or 12) + (props.rightPadding or 12),
        vertical = (props.topPadding or 8) + (props.bottomPadding or 8)
    }
    local width = math.max(props.width or 0, font:getWidth(props.text) + padding.horizontal)
    local height = math.max(props.height or 0, font:getHeight(props.text) + padding.vertical)
    return component {
        text = props.text,
        icon = props.icon or nil,
        --
        id = props.id or tostring(love.timer.getTime()),
        x = props.x or 0,
        y = props.y or 0,
        width = width,
        height = height,
        font = font,
        -- styles
        opacity = props.opacity or 1,
        backgroundColor = props.backgroundColor or Hex '#DBE2EF',
        hoverColor = props.hoverColor or Hex '#3F72AF',
        textColor = props.textColor or Hex '#112D4E',
        cornerRadius = props.cornerRadius or 4,
        leftPadding = props.leftPadding or 12,
        rightPadding = props.rightPadding or 12,
        topPadding = props.topPadding or 8,
        bottomPadding = props.bottomPadding or 8,
        borderColor = props.borderColor or { 1, 1, 1 },
        borderWidth = props.borderWidth or 0,
        border = props.border or false,
        angle = props.angle or 0,
        scale = props.scale or 1,
        -- logic
        onClick = props.onClick,
        onHover = props.onHover,
        disabled = props.disabled or false,
        hoverCalled = false,
        selected = false,
        onUpdate = function(self)
            if love.mouse.isDown(1) then
                if self.mousePressed == false and self:isMouseInside() and self.parent.visible then
                    self.mousePressed = true
                    self.selected = true
                    if props.onClick then self:onClick() end
                end
                if self.mousePressed == false and not self:isMouseInside() and self.parent.visible then
                    self.selected = false
                end
            else
                self.mousePressed = false
            end
        end,
        --
        draw = function(self)
            if not self.visible then return love.mouse.setCursor() end
            love.graphics.push()
            love.graphics.rotate(self.angle)
            love.graphics.scale(self.scale, self.scale)
            love.graphics.setFont(font)
            -- border
            if self.border then
                love.graphics.setColor(self.borderColor)
                love.graphics.setLineWidth(self.borderWidth)
                love.graphics.rectangle('line', self.x, self.y, self.width, self.height, self.cornerRadius)
                love.graphics.setColor({ 0, 0, 0 })
            end
            --
            love.graphics.setColor({
                self.backgroundColor[1],
                self.backgroundColor[2],
                self.backgroundColor[3],
                self.opacity })
            -- hover
            if self:isMouseInside() then
                if self.onHover and not self.hoverCalled then
                    --*  onHover return a 'clean up' callback
                    self.onMouseExit = self.onHover(self)
                    self.hoverCalled = true
                end
                love.mouse.setCursor(love.mouse.getSystemCursor('hand'))
                love.graphics.setColor(self.hoverColor[1], self.hoverColor[2], self.hoverColor[3], self.opacity)
                self.hovered = true
            elseif self.hovered then
                love.mouse.setCursor()
                if self.onMouseExit then
                    self.onMouseExit()
                end
                self.hovered = false
                self.hoverCalled = false
            elseif self.selected then
                love.graphics.setColor(255, 0, 0, 1)
            end
            love.graphics.rectangle('fill', self.x, self.y, self.width, self.height, self.cornerRadius)
            love.graphics.setColor(self.textColor[1], self.textColor[2], self.textColor[3], self.opacity)
            love.graphics.printf(self.text, self.x + self.leftPadding, self.y + self.topPadding,
                self.width - padding.horizontal, 'center')
            love.graphics.setColor({ 1, 1, 1 })
            love.graphics.pop()
        end,

        textinput = function(self, t)
            self.text = self.text .. t
        end,

        keyPressed = function(self, key)
            local byteoffset
            if key == "backspace" then
                -- get the byte offset to the last UTF-8 character in the string.
                byteoffset = utf8.offset(self.text, -1)
            end
            
            if byteoffset then
                print(byteoffset)
                -- remove the last UTF-8 character.
                -- string.sub operates on bytes rather than UTF-8 characters, so we couldn't do string.sub(self.text, 1, -2).
                self.text = string.sub(self.text, 1, byteoffset - 1)
            end
        end
    }
end
