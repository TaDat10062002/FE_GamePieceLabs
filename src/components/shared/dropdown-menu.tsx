"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";

type WithoutChildren<T> = Omit<T, "children">;

export interface DropdownMenuActionItem {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render một menu item có thể chọn. */
  type: "item";
  /** Nội dung chính của item. */
  label: ReactNode;
  /** Icon đặt trước label. */
  icon?: ReactNode;
  /** Phím tắt hiển thị ở mép phải item. */
  shortcut?: ReactNode;
  /** Props chuyển tiếp đến primitive `DropdownMenuItem`, trừ `children`. */
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuItem>>;
}

export interface DropdownMenuCheckboxEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render checkbox item; truyền `checked`/`onCheckedChange` qua `props`. */
  type: "checkbox";
  /** Nội dung chính của checkbox item. */
  label: ReactNode;
  /** Icon đặt trước label. */
  icon?: ReactNode;
  /** Phím tắt hiển thị ở mép phải item. */
  shortcut?: ReactNode;
  /** Props chuyển tiếp đến primitive checkbox item. */
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuCheckboxItem>>;
}

export interface DropdownMenuCustomEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render nội dung tùy biến, ví dụ slider hoặc form control. */
  type: "custom";
  /** Nội dung tùy biến bên trong menu. */
  children: ReactNode;
  /** Props cho wrapper `div` của nội dung tùy biến. */
  props?: WithoutChildren<ComponentProps<"div">>;
}

export interface DropdownMenuLabelEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render nhãn nhóm, không có interaction. */
  type: "label";
  /** Nội dung nhãn. */
  label: ReactNode;
  /** Props chuyển tiếp đến primitive label. */
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuLabel>>;
}

export interface DropdownMenuSeparatorEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render đường phân cách. */
  type: "separator";
  /** Props chuyển tiếp đến primitive separator. */
  props?: ComponentProps<typeof DropdownMenuSeparator>;
}

export interface DropdownMenuGroupEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render nhóm item cùng ngữ cảnh. */
  type: "group";
  /** Các entry con trong nhóm. */
  items: DropdownMenuEntry[];
  /** Props chuyển tiếp đến primitive group. */
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuGroup>>;
}

export interface DropdownMenuRadioItemEntry {
  /** Key ổn định của radio item. */
  id: string;
  /** Nội dung chính của radio item. */
  label: ReactNode;
  /** Icon đặt trước label. */
  icon?: ReactNode;
  /** Phím tắt hiển thị ở mép phải item. */
  shortcut?: ReactNode;
  /** Props bắt buộc, gồm `value`, chuyển tiếp đến primitive radio item. */
  props: WithoutChildren<ComponentProps<typeof DropdownMenuRadioItem>>;
}

export interface DropdownMenuRadioGroupEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render một radio group; truyền `value`/`onValueChange` qua `props`. */
  type: "radio-group";
  /** Các lựa chọn radio. */
  items: DropdownMenuRadioItemEntry[];
  /** Props chuyển tiếp đến primitive radio group. */
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuRadioGroup>>;
}

export interface DropdownMenuSubEntry {
  /** Key ổn định dùng khi render danh sách menu. */
  id: string;
  /** Render submenu lồng nhau. */
  type: "sub";
  /** Nội dung trigger của submenu. */
  label: ReactNode;
  /** Icon đặt trước label trigger. */
  icon?: ReactNode;
  /** Các entry nằm trong submenu. */
  items: DropdownMenuEntry[];
  /** Props chuyển tiếp đến primitive submenu root. */
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuSub>>;
  /** Props cho trigger của submenu. */
  triggerProps?: WithoutChildren<
    ComponentProps<typeof DropdownMenuSubTrigger>
  >;
  /** Props cho content của submenu. */
  contentProps?: WithoutChildren<
    ComponentProps<typeof DropdownMenuSubContent>
  >;
}

export type DropdownMenuEntry =
  | DropdownMenuActionItem
  | DropdownMenuCheckboxEntry
  | DropdownMenuCustomEntry
  | DropdownMenuGroupEntry
  | DropdownMenuLabelEntry
  | DropdownMenuRadioGroupEntry
  | DropdownMenuSeparatorEntry
  | DropdownMenuSubEntry;

/** Menu khai báo bằng dữ liệu; dùng cho action, sort hoặc filter dropdown. */
export interface DropdownMenuProps {
  /** ReactNode mở menu; dùng `triggerProps={{ asChild: true }}` nếu đây là button riêng. */
  trigger: ReactNode;
  /** Các entry menu theo discriminated union `DropdownMenuEntry`. */
  items: DropdownMenuEntry[];
  /** Props root như controlled `open` và `onOpenChange`. */
  rootProps?: WithoutChildren<ComponentProps<typeof DropdownMenuRoot>>;
  /** Props cho trigger primitive. */
  triggerProps?: WithoutChildren<ComponentProps<typeof DropdownMenuTrigger>>;
  /** Props cho panel content, ví dụ `align`, `sideOffset`, `className`. */
  contentProps?: WithoutChildren<ComponentProps<typeof DropdownMenuContent>>;
}

function ItemContent({
  icon,
  label,
  shortcut,
}: Pick<
  DropdownMenuActionItem,
  "icon" | "label" | "shortcut"
>): ReactNode {
  return (
    <>
      {icon}
      <span className="text-base leading-snug sm:text-sm">{label}</span>
      {shortcut ? (
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      ) : null}
    </>
  );
}

function renderEntries(items: DropdownMenuEntry[]): ReactNode {
  return items.map((entry) => {
    switch (entry.type) {
      case "item": {
        return (
          <DropdownMenuItem key={entry.id} {...entry.props}>
            <ItemContent
              icon={entry.icon}
              label={entry.label}
              shortcut={entry.shortcut}
            />
          </DropdownMenuItem>
        );
      }

      case "checkbox": {
        return (
          <DropdownMenuCheckboxItem key={entry.id} {...entry.props}>
            <ItemContent
              icon={entry.icon}
              label={entry.label}
              shortcut={entry.shortcut}
            />
          </DropdownMenuCheckboxItem>
        );
      }

      case "custom": {
        return (
          <div key={entry.id} {...entry.props}>
            {entry.children}
          </div>
        );
      }

      case "label": {
        return (
          <DropdownMenuLabel key={entry.id} {...entry.props}>
            {entry.label}
          </DropdownMenuLabel>
        );
      }

      case "separator": {
        return <DropdownMenuSeparator key={entry.id} {...entry.props} />;
      }

      case "group": {
        return (
          <DropdownMenuGroup key={entry.id} {...entry.props}>
            {renderEntries(entry.items)}
          </DropdownMenuGroup>
        );
      }

      case "radio-group": {
        return (
          <DropdownMenuRadioGroup key={entry.id} {...entry.props}>
            {entry.items.map((radioItem) => (
              <DropdownMenuRadioItem key={radioItem.id} {...radioItem.props}>
                <ItemContent
                  icon={radioItem.icon}
                  label={radioItem.label}
                  shortcut={radioItem.shortcut}
                />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        );
      }

      case "sub": {
        return (
          <DropdownMenuSub key={entry.id} {...entry.props}>
            <DropdownMenuSubTrigger {...entry.triggerProps}>
              {entry.icon}
              <span className="text-base leading-snug sm:text-sm">{entry.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent {...entry.contentProps}>
              {renderEntries(entry.items)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }
    }
  });
}

export function DropdownMenu({
  contentProps,
  items,
  rootProps,
  trigger,
  triggerProps,
}: DropdownMenuProps) {
  return (
    <DropdownMenuRoot {...rootProps}>
      <DropdownMenuTrigger {...triggerProps}>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        {...contentProps}
        className={cn("max-w-[calc(100vw-2rem)]", contentProps?.className)}
      >
        {renderEntries(items)}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export default DropdownMenu;
