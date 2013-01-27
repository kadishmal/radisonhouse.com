<div id="menus-container" class="hide chunked">
{{#list menus}}{{#link text href}}{{/link}}{{/list}}
</div>
<script>
    var d = document, container = d.getElementById('menus-container');
    d.getElementById('navigation').innerHTML = container.innerHTML;
    container.parentNode.removeChild(container);
</script>