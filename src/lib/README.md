# Shared logic

Business logic belongs in `src/lib` or a domain module in `src/features`, never in components. Keep UI presentation in components and route composition in `src/app`.

`formatINR` accepts safe integer paise and returns an Indian-grouped INR display string. It supports signed amounts; domain validation of allowed prices belongs in future domain code. It is exported for later use, not shown as invented inventory.
