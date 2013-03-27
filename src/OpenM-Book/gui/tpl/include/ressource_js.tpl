<script src="{$resources_dir}jquery.min.js"></script>
<script src="{$resources_dir}js/bootstrap.min.js"></script>
        {literal}
            <script>
                $(function (){
                    $('.close').click(function() {
                        $('.alert').hide('slow');
                        $('#afficher').show();
                    });});
            </script>
        {/literal}