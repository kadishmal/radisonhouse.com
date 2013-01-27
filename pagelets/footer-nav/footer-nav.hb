<div id="menus-container" class="hide chunked">
{{#listInline menus}}{{#link text href}}{{/link}}{{/listInline}}
</div>
<script>
    var d = document, container = d.getElementById('menus-container');
    d.getElementById('footer-nav').innerHTML = container.innerHTML;
    container.parentNode.removeChild(container);
</script>